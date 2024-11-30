const Login = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.post('/login', { email: formData.email, senha: formData.senha });
            
            if (data.length && data[0].id) {
                navigate('/feed');
                return;
            }

            alert('Usuário ou senha inválido');
        } catch (e) {
            console.error('Erro ao realizar login:', e);
            alert('Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.');
        }
    };

    const handleCreateAccount = () => navigate('/signup');

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                     e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Faça seu cadastro</TitleLogin>
                        <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input 
                                placeholder="E-mail" 
                                leftIcon={<MdEmail />} 
                                name="email"  
                                control={control} 
                                rules={{
                                    required: 'E-mail é obrigatório',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'E-mail inválido'
                                    }
                                }}
                            />
                            {errors.email && <span>{errors.email.message}</span>}
                            <Input 
                                type="password" 
                                placeholder="Senha" 
                                leftIcon={<MdLock />}  
                                name="senha" 
                                control={control} 
                                rules={{
                                    required: 'Senha é obrigatória',
                                    minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
                                }}
                            />
                            {errors.senha && <span>{errors.senha.message}</span>}
                            <Button title="Entrar" variant="secondary" type="submit" />
                        </form>
                        <Row>
                            <EsqueciText>Esqueci minha senha</EsqueciText>
                            <CriarText onClick={handleCreateAccount}>Criar Conta</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Login };
