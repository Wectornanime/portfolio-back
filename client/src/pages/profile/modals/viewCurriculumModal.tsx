import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@heroui/modal";

interface props extends Omit<ModalProps, "children"> {
  curriculumUrl: string;
}

export default function ViewCurriculumModal({
  curriculumUrl,
  isOpen,
  onOpenChange,
}: props) {
  return (
    <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <p className="font-normal">curriculo.pdf</p>
            </ModalHeader>

            <ModalBody>
              <embed
                className="w-full h-[80vh]"
                src={`${curriculumUrl}#toolbar=0`}
                title="Curriculum preview"
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
