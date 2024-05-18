import React, { useState } from 'react';
import styles from './Receitas.module.css'
import { OpenAI } from 'openai';

const Receitas = () => {
    const [userInput, setUserInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    const openai = new OpenAI({
        apiKey: "sk-api-key",
        dangerouslyAllowBrowser: true,
        onError: () => {
            console.error("API key is invalid");
        }
    });

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }

    const handleClearMessage = () => {
        setAiResponse('');
    }

    const handleChatCompletion = async () => {
        if (userInput.trim() === '') {
            setError('Por favor, insira os produtos que utilizará an sua receita.');
            return;
        }
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Você sempre irá responder em português. Você se chama Chefe da Roça e você é um especialista em receitas. Você deve sugerir aos usuários uma receita (doces, salgadas ou drinks) que utilizem dos produtos inseridos pelo usuário. Também detalhe o modo de preparo de uma delas Você não deve responder a perguntas fora deste escopo.' },
                { role: 'system', content: 'Você irá indentificar a receta pelo nome e descrever os ingredientes presentes e o modo de preparo.'},
                { role: 'user', content: userInput}
            ]
        });

        setAiResponse(chatCompletion.choices[0].message.content);
    }

    return (
        <>
            <p className={styles.textoIntro}>Nossa equipe disponibiliza uma ferramenta para encontrar as melhores receitas com os produtos do site! Faça sua busca inserindo os ingredientes para obter sugestões de receitas ou insira o nome da receita para obter os ingredientes necessários.</p>
            <label type="text" className={styles.labelPrompt}>Ingredientes ou nome da receita</label>
            <input type="text" value={userInput} onChange={handleInputChange} className={styles.ImpPrompt} placeholder='maça, trigo, ovo...'/>
            <button onClick={handleChatCompletion} className={styles.btnPrompt}>Enviar</button>
            <div className={styles.respostaGPT}>
                {aiResponse.split(/[.;:]/).map((paragraph, index) => {
                const trimmedParagraph = paragraph.trim();
                return trimmedParagraph && <p key={index} className={styles.textoIntro}>{trimmedParagraph}.</p>;
                })}
            </div>
            <button onClick={handleClearMessage} className={styles.btnClean}>Limpar Mensagem</button>
        </>
    )
}

export default Receitas;