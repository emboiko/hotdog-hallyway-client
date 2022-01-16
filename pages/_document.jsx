import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charset="UTF-8" />
          <meta name="description" content="Hotdog Hallway Mankrik TBC Raiding Guild" />
          <meta name="keywords" content="Hotdog, Hallway, Hotdog-Hallway, Mankrik TBC, Hotdog Hallway Guild" />
          <meta name="author" content="Emboiko" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument