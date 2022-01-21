import * as React from 'react';
import RegistrationFormFirst from "../../components/RegistrationFormPages/RegistrationFormFirst";
import RegistrationFormSecond from "../../components/RegistrationFormPages/RegistrationFormSecond";
import RegistrationFormThird from "../../components/RegistrationFormPages/RegistrationFormThird";
import axios from 'axios'

function RegistrationForm(props) {
    const [pageNumber, setPageNumber] = React.useState(1);
    const handleNextPage = () => setPageNumber(pageNumber + 1);
    const handlePrevPage = () => setPageNumber(pageNumber - 1);

    const [registrationData, setRegistrationData] = React.useState({})
    const addRegistrationData = (data) => setRegistrationData(Object.assign(registrationData, data));

    const [image, setImage] = React.useState([]);
    const handleAddImage = (imageData) => setImage(imageData);

    const fd = new FormData();


    const setFormData = () => {
        for (const key in registrationData) {
            fd.append(key, registrationData[key])
        }
        image.map((file) => {
            fd.append('image', file);
        });
    }

    const sendRegistrationData = () => {

        return axios({
            method: "post",
            url: "http://34.125.5.252:3000/api/auth/register",
            data: fd
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    };

    const onSubmit = () => {
      setFormData();
      sendRegistrationData()
          .then(response => console.log(response))
          .catch(error => console.log(error.response));
    }


    return (
        <>
            {pageNumber === 1 ?
                <RegistrationFormFirst
                    registrationData={registrationData}
                    addRegistrationData={addRegistrationData}
                    handleNextPage={handleNextPage}
                    handleLogin={props.handleLogin}
                /> :
                pageNumber === 2 ?
                    <RegistrationFormSecond
                        addRegistrationData={addRegistrationData}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                    : <RegistrationFormThird
                        addRegistrationData={addRegistrationData}
                        handleAddImage={handleAddImage}
                        onSubmit={onSubmit}
                        handlePrevPage={handlePrevPage}
                    />
            }
        </>
    );
}

export default RegistrationForm;