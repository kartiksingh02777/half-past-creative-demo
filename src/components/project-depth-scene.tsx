type ProjectDepthSceneProps = {
  variant?: "projects" | "material";
};

export function ProjectDepthScene({ variant = "projects" }: ProjectDepthSceneProps) {
  const isMaterial = variant === "material";

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden bg-base-100 md:block" aria-hidden="true">
      <div className="absolute inset-0 bg-[url('/sentinel-static.png')] bg-cover bg-center" />
      <div
        className={`pointer-events-none absolute inset-0 ${
          isMaterial
            ? "bg-[linear-gradient(90deg,rgba(5,5,5,.74),rgba(5,5,5,.26)_54%,rgba(5,5,5,.56))]"
            : "bg-[linear-gradient(90deg,rgba(5,5,5,.3),rgba(5,5,5,.86)_36%,rgba(5,5,5,.86)_64%,rgba(5,5,5,.3))]"
        }`}
      />
    </div>
  );
}
