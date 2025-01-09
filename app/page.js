import Link from 'next/link';

export default function Page() {
    return (
        <>
            <h2>
                <Link href="/quiz_page">
                    Tu jest quiz
                </Link>
            </h2>
            <h2>
                <Link href="/search">
                    Tu jest strona wyszukiwania
                </Link>
            </h2>
            <h2>
                <Link href="/profiles/userChoices">
                    Tu jest strona profilu
                </Link>
            </h2>
            <h2>
                <Link href="/buttons_style">
                    Przyciski
                </Link>
            </h2>
            <h2>
                <Link href="/signup">
                    Rejestracja
                </Link>
            </h2>
            <h2>
                <Link href="/signin">
                    Logowanie
                </Link>
            </h2>
            <h2>
                <Link href="/ProposedProfiles">
                    Tu są proponowane profile
                </Link>
            </h2>
            <h2>
                <Link href="/ImageUploader">
                   Tu jest do testowania uploadu zdjęć
                </Link>
            </h2>
        </>
    );
}
