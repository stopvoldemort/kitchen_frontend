import React from 'react'
import { Card, Image } from 'semantic-ui-react'


export const HostCard = ({ host }) => {
  return (
    <div>
      <h2>Your Host</h2>
      <Card>
        <Image src={host.pic_url} />
        <Card.Content>
          <Card.Header>
            {host.name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Joined in {host.created_at.slice(0,4)}
            </span>
          </Card.Meta>
          <Card.Description>
            {host.bio}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  )
}
