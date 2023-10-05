import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";


const ModalComp = ({data,setData,dataEdit,isOpen,onClose}) => {
    const [nome, setNome] = useState(dataEdit.nome || "");
    const [preco, setPreco] = useState(dataEdit.preco || "");
    const [descricao, setDescricao] = useState(dataEdit.descricao || "");
    const [urlImgProduto, setUrlImgProduto] = useState(dataEdit.urlImgProduto || "");

    const handleSave = ()=>{
      if(!nome || !preco || !descricao) return;

      if(Object.keys(dataEdit).length){
        data[dataEdit.index] = {nome,preco,descricao,urlImgProduto};
      }

      const newDataArray = !Object.keys(dataEdit).length
      ?[...(data ? data : []),{nome,preco,descricao,urlImgProduto}]
      :[...(data ? data : [])];
      
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Cadastro De Produtos</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl display="flex" flexDir="column" gap={4}>
                    <Box>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={nome} onChange={(e)=> setNome(e.target.value)} />
                    </Box>
                    <Box>
                        <FormLabel>Preco</FormLabel>
                        <Input type="number" value={preco} onChange={(e)=> setPreco(e.target.value)} />
                    </Box>
                    <Box>
                        <FormLabel>Descricao</FormLabel>
                        <Input type="text" value={descricao} onChange={(e)=> setDescricao(e.target.value)} />
                    </Box>
                    <Box>
                        <FormLabel>Url da Imagem</FormLabel>
                        <Input type="text" value={urlImgProduto} onChange={(e)=> setUrlImgProduto(e.target.value)} />
                    </Box>
                </FormControl>
            </ModalBody>
        </ModalContent>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSave}>SALVAR</Button>
          <Button colorScheme="red" onClick={onClose}>CANCELAR</Button>
        </ModalFooter>
      </Modal>
      

    );
  }
  
  export default ModalComp;