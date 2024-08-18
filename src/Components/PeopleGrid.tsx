import { useState } from "react";
import styled from "styled-components";

export type PeopleData = {
  name: string;
  gender: string;
  birth_year: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  url: string;
};

export type PeopleGridProps = {
  data: PeopleData[];
  onBackClick: () => void;
};

const Body = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.thead`
  font-weight: bold;
  & th {
    text-align: start;
  }
`;

const Input = styled.input`
  width: 100%;
`;

const Button = styled.button`
  width: 30px;
`;

const mapData = ({
  name,
  gender,
  birth_year,
  mass,
  hair_color,
  skin_color,
  eye_color,
  url,
}: PeopleData) => (
  <tr key={url}>
    <td>{name}</td>
    <td>{gender}</td>
    <td>{birth_year}</td>
    <td>{mass}</td>
    <td>{hair_color}</td>
    <td>{skin_color}</td>
    <td>{eye_color}</td>
  </tr>
);

export function PeopleGrid({ data }: PeopleGridProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [mass, setMass] = useState("");
  const [hair, setHair] = useState("");
  const [skin, setSkin] = useState("");
  const [eye, setEye] = useState("");

  const [addedRows, setAddedRows] = useState<PeopleData[]>([]);

  const handleAddClick = () => {
    setIsEditOpen(true);
  };

  const handleOkClick = () => {
    setAddedRows((addedRows) => [
      {
        name,
        gender,
        birth_year: birth,
        mass,
        hair_color: hair,
        skin_color: skin,
        eye_color: eye,
        url: addedRows.length.toString(),
      },
      ...addedRows,
    ]);

    setName("");
    setGender("");
    setBirth("");
    setMass("");
    setHair("");
    setSkin("");
    setEye("");

    setIsEditOpen(false);
  };

  return (
    <Body>
      <table>
        <HeaderRow>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth</th>
            <th>Mass</th>
            <th>Hair</th>
            <th>Skin</th>
            <th>Eye</th>
            <th>
              <Button onClick={handleAddClick} disabled={isEditOpen}>
                +
              </Button>
            </th>
          </tr>
        </HeaderRow>
        <tbody>
          {isEditOpen && (
            <tr>
              <td>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={hair}
                  onChange={(e) => setHair(e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={skin}
                  onChange={(e) => setSkin(e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="text"
                  value={eye}
                  onChange={(e) => setEye(e.target.value)}
                />
              </td>
              <td>
                <Button onClick={handleOkClick}>ok</Button>
              </td>
            </tr>
          )}
          {addedRows.map(mapData)}
          {data.map(mapData)}
        </tbody>
      </table>
    </Body>
  );
}
