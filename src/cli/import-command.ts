import {CliCommandInterface} from './cli-command.interface.js';
import TsvFileReader from '../common/tsv-file-reader.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(filename: string): void {
    const fileReader = new TsvFileReader(filename.trim());
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)){
        throw err;
      }
    }
  }
}
