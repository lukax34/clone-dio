import {MdEmail, MdLock} from 'react-icons/md';
import {Button} from "../../components/Button";
import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {Column,Container,CriarText,EsqueciText,Row,SubtitleLogin,Title,TitleLogin,Wrapper } from './styles'
import { useNavigate  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api';
import { IFormData } from './types';


const Login = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'onChange'
    });
    const onSubmit = async (formData: IFormData) =>  {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            alert('Houve um erro, tente novamente')
        }
    };


    const handleClickSignIn = () => {
        navigate('/feed')
    }


    return(<>
        <Header />
        <Container>
            <Column>
                <Title> 
                A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.
                </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="email"  control={control} placeholder="E-mail" leftIcon={<MdEmail/>}/>
                        <Input name="password" control={control} placeholder="Senha" type="password" leftIcon={<MdLock/>}/>
                        <Button title="Entrar" variant="secondary" onClick={handleClickSignIn} type="submit"/>
                    </form>
                    <Row>
                        <EsqueciText>Esqueci minha senha</EsqueciText>
                        <CriarText>Criar conta</CriarText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }