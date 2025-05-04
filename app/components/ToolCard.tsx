import Link from "next/link";

interface ToolCardProps {
    title: string;
    description: string;
    icon: string;
    path: string;
}

export default function ToolCard({
    title,
    description,
    icon,
    path,
}: ToolCardProps) {
    return (
        <Link
            href={path}
            className="border rounded-lg p-6 hover:border-primary transition-colors hover:shadow-md"
        >
            <div className="flex flex-col items-center text-center space-y-3">
                <span className="text-3xl">{icon}</span>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </Link>
    );
}