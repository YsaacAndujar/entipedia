import { Files } from '@/lib/db';
import { FilesCardsItem } from './FilesCardsItem';

export const FilesCards = ({files}:{files: Files[]}) => {
 return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {files.map((file) => (
        <FilesCardsItem file={file} key={file.id} />
      ))}
    </div>
  );
}
