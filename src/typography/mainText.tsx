import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MainTextProp = {
  text: string
}
function MainText({ text }: MainTextProp) {
  // eslint-disable-next-line react/no-children-prop
  return <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
}

export default MainText
