import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden font-sans">
            {/* Декоративне фонове світіння */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-8">
                {/* Головний заголовок та опис */}
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                        Next-Gen{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600">
                            Quiz Builder
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                        A powerful full-stack platform designed to create, manage, and explore custom quizzes. Build
                        dynamic questions with multiple formats and test your knowledge seamlessly.
                    </p>
                </div>

                {/* Кнопки навігації */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/quizzes" className="w-full sm:w-auto">
                        <Button
                            variant="primary"
                            className="w-full px-8 py-3 text-lg font-semibold shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all">
                            Explore Quizzes
                        </Button>
                    </Link>

                    <Link href="/create" className="w-full sm:w-auto">
                        <Button variant="secondary" className="w-full px-8 py-3 text-lg font-semibold">
                            Create New Quiz
                        </Button>
                    </Link>
                </div>

                {/* Технічний стек (маленький бонус для рев'юверів) */}
                <div className="pt-16 flex items-center justify-center gap-6 text-zinc-600 text-sm font-medium">
                    <span>Next.js 14</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    <span>Express.js</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    <span>Prisma</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    <span>Tailwind CSS</span>
                </div>
            </div>
        </div>
    );
}
