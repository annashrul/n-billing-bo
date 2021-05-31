import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import Icon from './IconRounded'

interface iWidget{
    title: string;
    value: string;
    icon: string;
    color: string;
}

const Widget: React.FC<iWidget> = ({ title,value,icon,color }) => {
  return (
    <Card>
      <CardBody className="flex items-center">
          <Icon
            icon={icon}
            color={color}
          />
        <div>
          <p
            className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {title}
          </p>
          <p
            className="text-lg font-semibold text-gray-700 dark:text-gray-200"
          >
            {value}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default Widget;