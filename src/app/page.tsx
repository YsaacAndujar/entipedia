import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-full flex flex-col items-center justify-center bg-linear-to-b from-background to-muted/30 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <Card className="shadow-lg border border-border/40 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col items-center gap-3">
              <BookOpen className="h-10 w-10 text-primary" />
              <CardTitle className="text-3xl font-bold tracking-tight">
                Bienvenido, <span className="text-primary">Entipedia</span>
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-center">
              ¡Hola equipo de <strong>Entipedia</strong>! 👋
              Es un placer presentarles este proyecto, desarrollado como parte del proceso técnico.
            </p>

            <p className="text-muted-foreground leading-relaxed text-center">
              Esta aplicación fue construida utilizando <strong>Next.js</strong> tanto para el frontend como para el backend,
              integrando <strong>Drizzle ORM</strong> con <strong>PostgreSQL</strong> para una capa de datos segura y escalable.
              Además, se emplea <strong>shadcn/ui</strong> para lograr una interfaz moderna, accesible y coherente con las mejores prácticas de diseño.
            </p>

            <p className="text-muted-foreground leading-relaxed text-center">
              Mi objetivo con esta implementación es demostrar un enfoque limpio, mantenible y enfocado en la experiencia de usuario,
              con una base técnica sólida que permita seguir construyendo sobre ella.
              ¡Gracias por la oportunidad de compartir este trabajo!
            </p>
          </CardContent>
        </Card>

        <footer className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Entipedia — Proyecto técnico para entrevista
        </footer>
      </div>
    </main>
  )
}
