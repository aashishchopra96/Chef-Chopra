import React from 'react'
import ReactMarkdown from 'react-markdown'

const ClaudeRecipe = (props) => {
    return (
        <div>
            <section className='suggested-recipe-container'>
                
                    <ReactMarkdown children={props.recipe} />  //better to use children prop here to avoid warnings about "non-serializable values" in ReactMarkdown
                    {/* <ReactMarkdown>{props.recipe}</ReactMarkdown> */}  //also works
            </section>
        </div>
    )
}

export default ClaudeRecipe