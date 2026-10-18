// src/app/layout.tsx
import "@/styles/globals.css";

export const metadata = {
  title: "GoWeekend — туры выходного дня",
  description: "Туры выходного дня по Саратовской, Пензенской и Волгоградской областям.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}