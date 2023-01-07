import { Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
    ],
  },
  language: 'vn',
};

ClassicEditor.defaultLanguage = 'vn';

export const CKEditorBase: React.FC<any> = () => {
  // const { t } = useTranslation();
  return (
    <Fragment>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hola Houses</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
      />
    </Fragment>
  );
};
