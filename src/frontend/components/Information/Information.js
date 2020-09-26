import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './style.css'
import video from '../../lawnmower1.mp4';

const Information = ({state}) => {
    const pageVariants = {
        initial: {
          x: "-100vw",
        },
        in: {
          x: "0",
        },
        out: {
          x: "-100vw",
        },
      }
      const [ questions, setQuestions ] = useState([]);

      const [ hidden, setHidden ] = useState(true)

      useEffect(() => {

        console.log(state.language)
        setQuestions([
          {question: `${state.language == 1 ? "What's" : "Que es "} QuickMowFo?`, answer: `${state.language == 1 ? "QuickMowFo is a new online company that offers lawn care services" : "QuickMowFo es una nueva compania que ofrece servicios de mantenimiento de patios"}.`, expanded: false},
          {question: `${state.language == 1 ? "What locations do you cover?" : "Que ciudades ustedes cubren? "}`, answer: `${state.language == 1 ? "Most cities within 25m of Lake Land for the time being. When you enter your address in our website it'll let you know if we can reach your area." : "Cubrimos varias ciudades que esten a 25m de distancia a Lake Land por el momento. Cuando usted someta su direccion en nuestro website, el sistema le dira si cubrimos su area."}.`},
          {question: `${state.language == 1 ? "Can I cancel my order" : "Puedo cancelar mi order"}?`, answer: `${state.language == 1 ? "Yes. After you place your order, you will receive a receipt in your email. The receipt contains a button to instantly cancel your order and get a full refund" : "Si. Al usted completar la transaccion, recibira un recibo en su correo electronico. En el recibo habra una opcion para cancelar el servicio y recibir un reembolso."}.`, expanded: false},
          {question: `${state.language == 1 ? "Is the service good" : "El servicio es bueno"}?`, answer: `${state.language == 1 ? "You can let us know how we did. Once we're done working on your lawn you will receive an email message that contains a link where you can leave us some feedback. Let us know how we can improve and if you would choose us again" : "Dejenos saber. Apendas estamos comenzando. Luego de recibir nuestros servicios, usted recibira un mensaje por correo electronico que incluira un enlace done puede dejarnos su opinion y consejos"}.`, expanded: false},
        ])
      }, [state])

      const handleExpand = (i) => {
        console.log('yeah');
        setQuestions(questions.map((q, s_id) => i == s_id ? {...q, expanded: !q.expanded} : {...q}));
      }

      setTimeout(() => setHidden(false), 1000)

    return(
        <motion.div 
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="">
            {/* <div className={`video_container ${hidden && 'hidden'}`}>
              <video autoPlay muted loop>
                  <source src={video} type="video/mp4"/>
              </video> 
            </div> */}
            <div className="input">
                {questions.map((q, i) => (<>
                  <div className="question" onClick={() => handleExpand(i)}>{q.question}</div>
                  <div className={`text ${q.expanded && 'expanded'}`}>
                    {q.answer}
                  </div>
                </>))

                }
            </div>
        </motion.div>
    )
}

export default Information