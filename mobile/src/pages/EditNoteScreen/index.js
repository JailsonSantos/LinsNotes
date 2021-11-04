import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Container,
  TitleInput,
  BodyInput,
  SaveButton,
  SaveButtonImage,
  CloseButton,
  CloseButtonImage,
  DeleteButton,
  DeleteButtonText
} from './styles';

export default () => {

  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const list = useSelector(state => state.notes.list);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('new');

  // Verifica se o usuario mandou parametro(index), para Editar
  useEffect(() => {
    if (route.params?.key != undefined && list[route.params.key]) {
      setStatus('edit');
      setTitle(list[route.params.key].title);
      setBody(list[route.params.key].body);
    }
  }, []);

  // Monitora o layout, depois que um componentes é carregado
  useLayoutEffect(() => {
    navigation.setOptions({
      title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação',
      headerLeft: () => (
        <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
          <CloseButtonImage source={require('../../assets/close.png')} />
        </CloseButton>
      ),
      headerRight: () => (
        <SaveButton underlayColor="transparent" onPress={handleSaveButton}>
          <SaveButtonImage source={require('../../assets/save.png')} />
        </SaveButton>
      )
    });
  }, [status, title, body]);

  // Cancelar
  const handleCloseButton = () => {
    navigation.goBack();
  }

  const handleSaveButton = () => {
    if (title != '' && body != '') {
      if (status == 'edit') {
        dispatch({
          type: 'EDIT_NOTE',
          payload: {
            key: route.params.key,
            title,
            body
          }
        });
      } else {
        dispatch({
          type: 'ADD_NOTE',
          payload: { title, body }
        });
      }

      navigation.goBack();
    } else {
      alert("Preencha título e corpo");
    }
  }

  const handleDeleteButton = () => {
    dispatch({
      type: 'DEL_NOTE',
      payload: {
        key: route.params.key,
      }
    });

    navigation.goBack();
  }

  // Solução para o autoFocus funcionar
  const _input = useRef();
  useEffect(() => {
    setTimeout(() => {
      _input.current.focus(true);
    }, 1);
  }, [])

  return (
    <Container>
      <TitleInput
        value={title}
        onChangeText={t => setTitle(t)}
        placeholder="Digite o título da anotação"
        placeholderTextColor="#CCC"
        //autoFocus={true}
        ref={_input}
      />
      <BodyInput
        value={body}
        onChangeText={t => setBody(t)}
        placeholder="Digite o corpo da anotação"
        placeholderTextColor="#CCC"
        multiline={true}
        textAlignVertical="top"
      />

      {status == 'edit' &&
        <DeleteButton underlayColor="#FF0000" onPress={handleDeleteButton}>
          <DeleteButtonText>Excluir Anotação</DeleteButtonText>
        </DeleteButton>
      }
    </Container>
  )
}
