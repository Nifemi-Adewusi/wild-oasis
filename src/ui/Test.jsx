// import { css } from "styled-components";
import tw from "tailwind-styled-components";

const Test = tw.p`
    font-bold
    ${(props)=> props.type === "small" && `
        text-center text-sm bg-white
    `}
  text-xl
`

export default Test