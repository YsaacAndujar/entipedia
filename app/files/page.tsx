import { UploadFile } from "./components/UploadFile";

export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold">
                Archivos
            </h1>
            <UploadFile />
        </>
    );
}