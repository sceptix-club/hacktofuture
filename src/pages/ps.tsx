import { useParams, Navigate } from "react-router-dom";
import { VALID_THEME_SLUGS, themes, type ThemeSlug } from "../content/data";
import PSPageClient from "../components/ps/PSPageClient";

export default function PSPage() {
  const { theme } = useParams<{ theme: string }>();

  if (!theme || !VALID_THEME_SLUGS.includes(theme as ThemeSlug)) {
    return <Navigate to="/" replace />;
  }

  const data = themes[theme as ThemeSlug];

  return <PSPageClient data={data} />;
}
