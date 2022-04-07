import { IArgsForPreparedText } from '../interface';
import languagePack from '../messages';

export default class DiscordCommonView {
  protected messages: typeof languagePack;

  constructor() {
    this.messages = languagePack;
  }

  protected preparedText = (
    text: string,
    args: IArgsForPreparedText
  ): string => {
    const textVatiableForReplace = text.match(/\{[A-Za-z_0-9]+\}/g);

    if (textVatiableForReplace === null) {
      return text;
    }

    let preparedText: string = '';

    textVatiableForReplace.forEach(it => {
      const arg = args[it.split('{')[1].split('}')[0]];

      if (preparedText === '') {
        preparedText = text.replace(
          it,
          `${arg === null || arg === undefined ? 'інформація відсутня' : arg}`
        );
      } else {
        preparedText = preparedText.replace(
          it,
          `${arg === null || arg === undefined ? 'інформація відсутня' : arg}`
        );
      }
    });

    return preparedText;
  };
}
