from langchain import OpenAI
from langchain.chains import LLMChain, ConversationChain
from langchain.chains.conversation.memory import (ConversationBufferMemory,
                                                  ConversationSummaryMemory,
                                                  ConversationBufferWindowMemory,
                                                  ConversationKGMemory)
from langchain.callbacks import get_openai_callback
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
import openai
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
import torch
from langchain.llms import OpenAI
from flask import Flask, request, jsonify
from flask import Flask
from flask_cors import CORS

class ChatModel:
    def __init__(self):
        self.OPENAI_API_KEY = "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" #getpass()
        self.llm = OpenAI(
            temperature=0,
            openai_api_key=self.OPENAI_API_KEY,
            model_name='text-davinci-003'  # can be used with llms like 'gpt-3.5-turbo'
        )

        self.template = """
        Provide fashion outfit recommendations for different occasions based on user queries.
        Respond with appropriate outfit suggestions that suit the specified event or scenario.
        Ensure the recommendations are stylish, suitable for the occasion, and consider factors such as weather, formality, and personal style. Always recommend 1 topwear, 1 bottomwear, 1 footwear and 1 accessory to go along with
        Question: {question}
        Answer:
        """

        self.prompt = PromptTemplate(
            input_variables=["question"], template=self.template
        )

        self.conversation_sum = LLMChain(
            llm=self.llm,
            memory=ConversationSummaryMemory(llm=self.llm), prompt = self.prompt
        )

    def __call__(self, question):
        return self.conversation_sum.run(question)



app = Flask(__name__)
CORS(app)
chat_model = ChatModel()

@app.route('/getans', methods=['POST'])
def capitalize_text():
    try:
        data = request.json
        print(data)
        userId=  ""
        input_text = data['text']
        # print("received"+userId+input_text)
        answer = chat_model(input_text)
        answer="sample text"
        # answer = input_text.upper()
        urls = []
        return jsonify({'result': answer, 'urls':urls}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__=="__main__":
    print("Starting Flask Server")
    app.run(debug=True, port=5000)