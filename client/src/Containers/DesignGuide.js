import React from 'react';
import styled from 'styled-components';

import {
  Button,
  Input,
  TagList, Tag,
  BadgeList, Badge,
} from '../UIComponents';

const Section = styled.div`
  margin-bottom: 60px;
`;
const SubTitle = styled.h3`
`;
const InlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

function DesignGuide({ ...rest }) {
  return (
    <div>
      <h1>Design Guide</h1>

      <Section>
        <SubTitle>Buttons</SubTitle>
        <InlineContainer>
          <Button size="small">Small</Button>
          <Button>Regular</Button>
          <Button size="large">Large</Button>
        </InlineContainer>

        <InlineContainer>
          <Button className="brand">Brand</Button>
          <Button className="accent">Accent</Button>
          <Button className="success">Success</Button>
          <Button className="information">Information</Button>
          <Button className="warning">Warning</Button>
          <Button className="danger">Danger</Button>
        </InlineContainer>
      </Section>

      <Section>
        <SubTitle>Form</SubTitle>
        <Input />
        <br />
        <Input block />
      </Section>

      <Section>
        <SubTitle>Tags</SubTitle>
        <p>
          Tags font color will be a qualified guess based on background color.
          In order for that to work only color on the following format is supported:
          <code>#112233</code>
        </p>
        <TagList>
          <Tag size="small">Small tag</Tag>
          <Tag>default tag</Tag>
          <Tag size="large">Large tag</Tag>
        </TagList>
        <br />
        <br />
        <TagList>
          <Tag color="#440000">Dark red</Tag>
          <Tag color="#CC6666">Light red</Tag>
          <br/>
          <Tag color="#0E5096" onDelete={() => console.log("Clicked")}>Deleteable</Tag>
          <Tag color="#992244" onDelete={() => console.log("Clicked")}>Deleteable</Tag>
          <br />
          <Tag color="#0E5096" size="small" onDelete={() => console.log("Clicked")}>Deleteable</Tag>
          <Tag color="#992244" size="small" onDelete={() => console.log("Clicked")}>Deleteable</Tag>
          <br />
          <Tag color="#0E5096" size="large" onDelete={() => console.log("Clicked")}>Deleteable</Tag>
          <Tag color="#992244" size="large" onDelete={() => console.log("Clicked")}>Deleteable</Tag>
        </TagList>
      </Section>

      <Section>
        <SubTitle>Badges</SubTitle>
        <p>
          Badge font color will be a qualified guess based on background color.
          In order for that to work only color on the following format is supported:
          <code>#112233</code>
        </p>
        <BadgeList>
          <Badge size="small">Small badge</Badge>
          <Badge>default badge</Badge>
          <Badge size="large">Large badge</Badge>
        </BadgeList>
        <br />
        <br />
        <BadgeList>
          <Badge color="#440000">Dark red</Badge>
          <Badge color="#CC6666">Light red</Badge>
        </BadgeList>
      </Section>

    </div>
  );
}

export default DesignGuide;
