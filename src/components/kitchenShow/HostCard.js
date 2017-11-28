import React from 'react'
import { Card, Image } from 'semantic-ui-react'


export const HostCard = ({ host }) => {
  console.log(host);
  // const picUrl = "https://cdn.pixabay.com/photo/2017/04/01/21/37/beautiful-2194518_1280.jpg"
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
