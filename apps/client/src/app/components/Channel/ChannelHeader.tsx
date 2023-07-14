import Card from '@material-ui/core/Card'
import React from 'react'

export interface ChannelHeaderProps {
  children: React.ReactNode
}

export const ChannelHeader: React.FC<ChannelHeaderProps> = (props) => {
  const { children } = props

  return (
    <Card
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
      }}
    >
      {children}
    </Card>
  )
}

export default ChannelHeader
