import { readdir, unlink } from 'fs';
import path from 'path';

(async () => {
  try {
    const models = ['circle', 'rectangle', 'shapes', 'circumference', 'hwm'];

    models.map((model) => {
      const modelPath = path.join(__dirname, '../', 'models', model, 'code');
      readdir(modelPath, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          data.map((file) =>
            unlink(path.join(modelPath, file), (err) => {
              if (err) {
                console.error(`Error deleting file: ${err}`);
              } else {
                console.log(
                  `File ${path.join(
                    modelPath,
                    file
                  )} has been successfully deleted`
                );
              }
            })
          );
        }
      });
      // unlink()
    });
  } catch (error) {
    console.log(error);
  }
})();
