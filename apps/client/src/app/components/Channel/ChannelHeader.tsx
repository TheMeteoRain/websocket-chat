import Card from '@material-ui/core/Card'
import React from 'react'

export interface ChannelHeaderProps {}

export const ChannelHeader: React.FC<ChannelHeaderProps> = (props) => {
  const { children } = props

  return <Card>{children}</Card>
}

export default ChannelHeader
