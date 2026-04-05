import { ModalBody, ModalContent, ModalHeader } from "@heroui/modal";

export default function ViewCurriculumModal() {
  return (
    <ModalContent>
      {() => (
        <>
          <ModalHeader>
            <p>Trocar imagem de usuário</p>
          </ModalHeader>
          <ModalBody>
            <h1>testando</h1>
          </ModalBody>
        </>
      )}
    </ModalContent>
  )
}
