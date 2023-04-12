import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoExample({ text }) {
  return (
    <Label>
      <Checkbox type="checkbox" />
      <Span>{text}</Span>
      <Button>
        <FontAwesomeIcon icon={faPen} color="#bababa" />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faTrash} color="#bababa" />
      </Button>
    </Label>
  );
}

const Checkbox = styled.input`
  appearance: none;
  width: 1.1em;
  height: 1.1em;
  border: 1px solid #7c83fd;
  border-radius: 3px;
  &:checked {
    background-color: #7c83fd;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  }
`;
const Label = styled.label`
  display: flex;
  margin: 1em;
  align-items: center;
`;
const Button = styled.button`
  border: none;
  background: inherit;
  color: #7c83fd;
  width: 5em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.1);
  }
`;
const Span = styled.span`
  color: #7c83fd;
  margin: 0 1em 0 1em;
`;

export default TodoExample;
