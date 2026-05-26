// src/components/Header.jsx
export default function Header() {
    return (
        <header className="bg-black/60 border-b border-orange-950/40 p-6 flex items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
                {/* Un pequeño icono decorativo */}
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-black">T</div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Table <span className="text-orange-500">Track</span>
                </h1>
            </div>
        </header>
    );
}