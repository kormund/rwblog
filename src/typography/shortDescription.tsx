import styled from 'styled-components'

const StyledShortDescription = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  line-height: 22px;
  margin-top: 10px;
  background: ${({ theme }) => theme.baseBg};
`
interface ShortDescriptionProps {
  description: string
}

function ShortDescription({ description }: ShortDescriptionProps) {
  return <StyledShortDescription>{description}</StyledShortDescription>
}

export default ShortDescription
