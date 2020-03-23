const colors = {
  primary: 'hsl(1, 65%, 50%)',
  gray: 'hsl(217, 10%, 45%)',
  grayLight: 'hsl(217, 10%, 92%)',
  grayDim: '#F9F9FB',
  grayDark: '#343232',
  grayGhost: 'hsl(217, 31%, 93%)',
  grayFoo: '#737373',
}

const utils = {
  alpha(hsl: string, alpha: number) {
    return hsl.replace(/\)$/, `,${alpha}$&`)
  },
}

export default {
  colors,
  styles: {
    body: {
      bgColor: '#fff',
      color: 'hsl(0, 10%, 13%)',
    },
    header: {
      color: colors.gray,
      linkColor: colors.gray,
    },
    footer: {
      linkColor: '#000',
    },
    code: `
      background-color: hsla(50, 100%, 70%, 0.2);
      border: 1px solid hsla(50, 70%, 60%, 0.4);
    `,
    table: {
      borderColor: colors.grayLight,
    },
    fieldset: {
      borderColor: colors.grayLight,
    },
    rangeInput: {
      runnableTrackBgColor: colors.grayLight,
    },
    gitHubRepo: {
      linkColor: colors.primary,
    },
  },
  utils,
}
