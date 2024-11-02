import React, { useState } from "react";
import styles from "./Receitas.module.css";
import { OpenAI } from "openai";

const Receitas = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: "api-key",
    dangerouslyAllowBrowser: true,
    onError: () => {
      console.error("API key is invalid");
    },
  });

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleClearMessage = () => {
    setAiResponse("");
  };

  const handleChatCompletion = async () => {
    if (userInput.trim() === "") {
      setError("Por favor, insira os produtos que utilizará an sua receita.");
      return;
    }
    setLoading(true);
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'Você sempre irá responder em português. Seu nome é Chefe da Roça e você é um especialista em receitas. Quando os usuários inserirem uma lista de produtos, você deve sugerir uma receita (doce, salgada ou drink) que utilize esses produtos. Além disso, você deve detalhar o modo de preparo da receita sugerida. Não deve responder a perguntas fora deste escopo. Não utilize o caractere "-", não utilize plavras abreviadas, altere os termos que utilizem do sufixo "pré" por outro da mesma denotação para não utilizar ifem. Exemplo: "pré-aquecer" pode ser substituído por "aquecer previamente".',
        },
        {
          role: "system",
          content:
            "Você irá indentificar a receta pelo nome e descrever os ingredientes presentes e o modo de preparo.",
        },
        { role: "user", content: userInput },
      ],
    });
    setLoading(false);

    setAiResponse(chatCompletion.choices[0].message.content);
  };

  return (
    <>
      <h1 className={styles.title}>Receitas</h1>
      <p className={styles.textoIntro}>
        Nossa equipe disponibiliza uma ferramenta de I.A. (Inteligencia
        Artigicial) para encontrar as melhores receitas com os produtos do site!
        Faça sua busca inserindo os ingredientes para obter sugestões de
        receitas ou insira o nome da receita para obter os ingredientes
        necessários.
      </p>
      <label type="text" className={styles.labelPrompt}>
        Ingredientes ou nome da receita
      </label>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className={styles.ImpPrompt}
        placeholder="maça, trigo, ovo..."
      />
      <button
        onClick={handleChatCompletion}
        className={styles.btnPrompt}
        disabled={loading}
      >
        Enviar
      </button>
      <div className={styles.respostaGPT}>
        {loading && <div className={styles.ProgressBar}></div>}
        {aiResponse
          .split(/(?<![0-9])[.;:](?![0-9])|.(?=-)/)
          .map((paragraph, index) => {
            const trimmedParagraph = paragraph.trim();
            return (
              trimmedParagraph && (
                <p key={index} className={styles.textoIntro}>
                  {trimmedParagraph}.
                </p>
              )
            );
          })}
      </div>
      <button onClick={handleClearMessage} className={styles.btnClean}>
        Limpar Mensagem
      </button>
    </>
  );
};

export default Receitas;
