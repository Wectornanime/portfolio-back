import { Spinner } from "@heroui/spinner";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Spinner color="white" size="lg" />
    </div>
  );
}
