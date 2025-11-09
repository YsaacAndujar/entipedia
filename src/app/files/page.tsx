import { FileViewer } from "./components/FileViewer";
import { UploadFile } from "./components/UploadFile";
//TODO: revisar que se muestre toda la info y descargar
export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold">
                Archivos
            </h1>
            <UploadFile />
            <FileViewer />
        </>
    );
}