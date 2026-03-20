export default function ApplicationLogo({ className = 'h-9 w-auto' }) {
    return (
        <div className={className}>
            <img src="/media/logo.png" alt="Logo FICH" className="h-full w-auto object-contain" />
        </div>
    );
}
