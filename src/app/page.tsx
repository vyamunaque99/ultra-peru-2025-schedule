"use client"

import { useState, useRef } from "react"
import { Calendar } from "lucide-react"
import html2canvas from 'html2canvas-pro';
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Festival data - this would typically come from an API
const festivalData = {
  name: "Ultra Peru 2025",
  dates: "Abril 18-19, 2025",
  stages: [
    {
      name: "Main Stage",
      sets: [
        { id: "m1", artist: "Tkrx", time: "13:00 - 13:45", day: "Viernes" },
        { id: "m2", artist: "Reek", time: "13:50 - 14:50", day: "Viernes" },
        { id: "m3", artist: "Edd Blaze", time: "14:55 - 15:55", day: "Viernes" },
        { id: "m4", artist: "Aviux", time: "16:00 - 17:00", day: "Viernes" },
        { id: "m5", artist: "Broz", time: "17:05 - 18:05", day: "Viernes" },
        { id: "m6", artist: "Morten", time: "18:10 - 19:40", day: "Viernes" },
        { id: "m7", artist: "ISOxo", time: "19:45 - 21:00", day: "Viernes" },
        { id: "m8", artist: "Oliver Heldens", time: "21:05 - 22:40", day: "Viernes" },
        { id: "m9", artist: "Axwell", time: "22:45 - 00:15", day: "Viernes" },
        { id: "m10", artist: "Loudek", time: "13:00 - 13:55", day: "Sábado" },
        { id: "m11", artist: "200DB", time: "14:00 - 14:55", day: "Sábado" },
        { id: "m12", artist: "Kayfex", time: "15:00 - 15:55", day: "Sábado" },
        { id: "m13", artist: "Sebastian Mateo", time: "16:00 - 16:55", day: "Sábado" },
        { id: "m14", artist: "Mykris", time: "17:00 - 18:00", day: "Sábado" },
        { id: "m15", artist: "Nghtmre", time: "18:05 - 19:20", day: "Sábado" },
        { id: "m16", artist: "Black Tiger Sex Machine", time: "19:20 - 20:40", day: "Sábado" },
        { id: "m17", artist: "Afrojack", time: "20:45 - 22:25", day: "Sábado" },
        { id: "m18", artist: "Martin Garrix", time: "22:30- 00:00", day: "Sábado" },
      ],
    },
    {
      name: "Resistance Stage",
      sets: [
        { id: "e1", artist: "Zpectrum", time: "13:00 - 13:55", day: "Viernes" },
        { id: "e2", artist: "Judas", time: "14:00 - 14:55", day: "Viernes" },
        { id: "e3", artist: "Anhedonia", time: "15:00 - 16:25", day: "Viernes" },
        { id: "e4", artist: "Nusha", time: "16:30 - 17:55", day: "Viernes" },
        { id: "e5", artist: "HI-LO", time: "18:00 - 19:25", day: "Viernes" },
        { id: "e6", artist: "Artbat", time: "19:30 - 21:55", day: "Viernes" },
        { id: "e7", artist: "Adam Beyer", time: "22:00 - 23:30", day: "Viernes" },
        { id: "e8", artist: "Alvaro Gomez", time: "13:00 - 13:55", day: "Sábado" },
        { id: "e9", artist: "Gonzalo Sandaza", time: "14:00 - 14:55", day: "Sábado" },
        { id: "e10", artist: "Paul Trelles", time: "15:00 - 15:55", day: "Sábado" },
        { id: "e11", artist: "Moritz Hofbauer", time: "16:00 - 17:25", day: "Sábado" },
        { id: "e12", artist: "Malóne", time: "17:30 - 18:55", day: "Sábado" },
        { id: "e13", artist: "Colyn", time: "19:00 - 20:25", day: "Sábado" },
        { id: "e14", artist: "Innellea", time: "20:30 - 21:55", day: "Sábado" },
        { id: "e15", artist: "Miss Monique", time: "22:00 - 23:30", day: "Sábado" },
      ],
    },
    {
      name: "UMF Radio",
      sets: [
        { id: "i1", artist: "Baracco", time: "13:00 - 14:25", day: "Viernes" },
        { id: "i2", artist: "Arzenic", time: "14:30 - 15:55", day: "Viernes" },
        { id: "i3", artist: "Flavia Paurinotto", time: "16:00 - 17:25", day: "Viernes" },
        { id: "i4", artist: "Jungle Jack", time: "17:30 - 18:55", day: "Viernes" },
        { id: "i5", artist: "Chinonegro", time: "19:00 - 20:25", day: "Viernes" },
        { id: "i6", artist: "Ammo Avenue", time: "20:30 - 22:00", day: "Viernes" },
        { id: "i7", artist: "Parental Control", time: "13:00 - 14:25", day: "Sábado" },
        { id: "i8", artist: "Grekz", time: "14:30 - 15:55", day: "Sábado" },
        { id: "i9", artist: "Jorhav", time: "16:00 - 17:25", day: "Sábado" },
        { id: "i10", artist: "Teba", time: "17:30 - 18:55", day: "Sábado" },
        { id: "i11", artist: "Jeaneiffel", time: "19:00 - 20:25", day: "Sábado" },
        { id: "i12", artist: "Arbaiza", time: "20:30 - 22:00", day: "Sábado" },
      ],
    },
  ],
}

export default function FestivalAgenda() {
  const [selectedSets, setSelectedSets] = useState<string[]>([])
  const [activeDay, setActiveDay] = useState("Viernes")
  const scheduleRef = useRef<HTMLDivElement>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleSetSelection = (setId: string) => {
    if (selectedSets.includes(setId)) {
      setSelectedSets(selectedSets.filter((id) => id !== setId))
    } else {
      setSelectedSets([...selectedSets, setId])
    }
  }

  const generateScheduleImage = async () => {
    if (!scheduleRef.current || selectedSets.length === 0) return

    setIsGenerating(true)

    try {
      const canvas = await html2canvas(scheduleRef.current, {
        backgroundColor: "#000000",
        scale: 2, // Balance between quality and performance
        logging: false,
        useCORS: true,
        allowTaint: true,
      })

      const image = canvas.toDataURL("image/png", 1.0)
      setGeneratedImage(image)
    } catch (error) {
      console.error("Error generating image:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadSchedule = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `${festivalData.name.replace(/\s+/g, "-")}-my-schedule.png`
    link.click()
  }

  const resetSelection = () => {
    setSelectedSets([])
    setGeneratedImage(null)
  }

  // Filter sets by the active day
  const getSetsByDay = (stage: (typeof festivalData.stages)[0]) => {
    return stage.sets.filter((set) => set.day === activeDay)
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-black text-white relative"
      style={{
        backgroundImage: "url('/images/card-ultra.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-cyan-900 p-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a className="h-8 relative" href="/">
              <img src="/images/ultra-logo-dark.png" alt="Ultra Festival" className="h-8 object-contain invert" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-black/50 text-white border-cyan-700">
              <Calendar className="h-3 w-3 mr-1" />
              {festivalData.dates}
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4 relative z-[1]">
        {generatedImage ? (
          <div className="flex flex-col items-center gap-4">
            <Card className="w-full overflow-hidden bg-black/70 border-cyan-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle>Tu horario de festival</CardTitle>
                <CardDescription className="text-gray-300">
                  Aqui tienes tu horario personalizado para Ultra Peru
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src={generatedImage || "/placeholder.svg"}
                    alt="Your personalized festival schedule"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-4">
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button onClick={downloadSchedule} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    <span className="whitespace-nowrap">Descargar Horario</span>
                  </Button>
                  <Button
                    onClick={resetSelection}
                    variant="outline"
                    className="w-full border-cyan-700 text-cyan-400 hover:bg-cyan-950"
                  >
                    <span className="whitespace-nowrap">Crear Nuevo Horario</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <>
            <Card className="mb-6 bg-black/70 border-cyan-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle>Crea tu horario</CardTitle>
                <CardDescription className="text-gray-300">
                  Seleccciona los sets de tu preferencia y genera tu horario personalizado.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <Tabs defaultValue="Viernes" onValueChange={setActiveDay}>
                  <TabsList className="w-full bg-black/60">
                    <TabsTrigger
                      value="Viernes"
                      className="flex-1 data-[state=active]:bg-cyan-800 data-[state=active]:text-white"
                    >
                      Viernes
                    </TabsTrigger>
                    <TabsTrigger
                      value="Sábado"
                      className="flex-1 data-[state=active]:bg-cyan-800 data-[state=active]:text-white"
                    >
                      Sábado
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="text-sm text-gray-400">{selectedSets.length} sets selected</div>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              {festivalData.stages.map((stage) => (
                <Card key={stage.name} className="bg-black/70 border-cyan-800 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="space-y-2">
                        {getSetsByDay(stage).map((set) => (
                          <div
                            key={set.id}
                            className={`p-3 rounded-md border cursor-pointer transition-all ${
                              selectedSets.includes(set.id)
                                ? "bg-cyan-900/70 border-cyan-500 text-white"
                                : "border-gray-700 hover:bg-black/40 hover:border-cyan-700"
                            }`}
                            onClick={() => toggleSetSelection(set.id)}
                          >
                            <div className="flex flex-col gap-1">
                              <div className="font-medium">{set.artist}</div>
                              <div className="text-sm text-gray-400">{set.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button
                onClick={generateScheduleImage}
                disabled={selectedSets.length === 0 || isGenerating}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {isGenerating ? "Generating..." : "Genera mi horario"}
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Hidden div for generating the image - iPhone 15 Pro optimized */}
      <div className="fixed left-[-9999px]" ref={scheduleRef}>
        {selectedSets.length > 0 && (
          <div
            className="w-[800px] h-[1200px] p-8 text-white"
            style={{
              backgroundImage: "url('/images/card-ultra.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            {/* Semi-transparent overlay for better readability */}
            <div className="absolute inset-0 bg-black/70" style={{ zIndex: 0 }}></div>

            {/* Content positioned above the overlay */}
            <div className="relative" style={{ zIndex: 1 }}>
              <div className="flex flex-col items-center mb-6">
                <div className="h-16 relative mb-4">
                  <img src="/images/ultra-logo.png" alt="Ultra Festival" className="h-16 object-contain invert" />
                </div>
                <p className="text-gray-300">{festivalData.dates}</p>
                <p className="mt-2 text-xl font-medium">Mi horario personal</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Viernes Column */}
                <div className="border border-cyan-800 rounded-lg p-4 bg-black/50">
                  <h2 className="text-xl font-bold text-center mb-4 text-cyan-400 pb-2 border-b border-cyan-900">
                    Viernes
                  </h2>
                  <div className="space-y-4">
                    {festivalData.stages.map((stage) => {
                      const filteredSets = stage.sets.filter(
                        (set) => selectedSets.includes(set.id) && set.day === "Viernes",
                      )
                      if (filteredSets.length === 0) return null

                      return (
                        <div key={`${stage.name}-viernes`} className="border-b border-cyan-900/50 pb-4 last:border-b-0">
                          <h3 className="text-md font-semibold mb-2 text-cyan-300">{stage.name}</h3>
                          <div className="space-y-2">
                            {filteredSets
                              .sort((a, b) => {
                                // Sort by time
                                const timeA = a.time.split(" - ")[0]
                                const timeB = b.time.split(" - ")[0]
                                return timeA.localeCompare(timeB)
                              })
                              .map((set) => (
                                <div
                                  key={set.id}
                                  className="p-2 bg-black/60 rounded shadow-sm border border-cyan-900/50"
                                >
                                  <div className="flex flex-col gap-1">
                                    <div className="font-medium">{set.artist}</div>
                                    <div className="text-sm text-gray-400">{set.time}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                    })}
                    {!festivalData.stages.some((stage) =>
                      stage.sets.some((set) => selectedSets.includes(set.id) && set.day === "Viernes"),
                    ) && <div className="text-center py-6 text-gray-500 italic">No sets selected for Viernes</div>}
                  </div>
                </div>

                {/* Sábado Column */}
                <div className="border border-cyan-800 rounded-lg p-4 bg-black/50">
                  <h2 className="text-xl font-bold text-center mb-4 text-cyan-400 pb-2 border-b border-cyan-900">
                    Sábado
                  </h2>
                  <div className="space-y-4">
                    {festivalData.stages.map((stage) => {
                      const filteredSets = stage.sets.filter(
                        (set) => selectedSets.includes(set.id) && set.day === "Sábado",
                      )
                      if (filteredSets.length === 0) return null

                      return (
                        <div key={`${stage.name}-sabado`} className="border-b border-cyan-900/50 pb-4 last:border-b-0">
                          <h3 className="text-md font-semibold mb-2 text-cyan-300">{stage.name}</h3>
                          <div className="space-y-2">
                            {filteredSets
                              .sort((a, b) => {
                                // Sort by time
                                const timeA = a.time.split(" - ")[0]
                                const timeB = b.time.split(" - ")[0]
                                return timeA.localeCompare(timeB)
                              })
                              .map((set) => (
                                <div
                                  key={set.id}
                                  className="p-2 bg-black/60 rounded shadow-sm border border-cyan-900/50"
                                >
                                  <div className="flex flex-col gap-1">
                                    <div className="font-medium">{set.artist}</div>
                                    <div className="text-sm text-gray-400">{set.time}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                    })}
                    {!festivalData.stages.some((stage) =>
                      stage.sets.some((set) => selectedSets.includes(set.id) && set.day === "Sábado"),
                    ) && <div className="text-center py-6 text-gray-500 italic">No sets selected for Sábado</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
