import * as React from 'react';
import RegistrationFormFirst from "./RegistrationFormFirst";
import RegistrationFormSecond from "./RegistrationFormSecond";
import RegistrationFormThird from "./RegistrationFormThird";
import API from '../../api'
import {setError} from "../../features/errorsSlice";
import {useDispatch} from "react-redux";


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


    const dispatch = useDispatch();

    const onSubmit = () => {
      setFormData();
        API.post(`auth/register`, fd)
            .then(response => {
                if (response.status === 201) {
                    props.handleLogin()
                }
            })
            .catch(() => {
                dispatch(setError(true))
            })
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