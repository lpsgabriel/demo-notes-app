import handler from "../util/handler"
import * as uuid from "uuid"
import dynamoDb from "../util/dynamoDb"

export const main = handler(async (event) => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      //Attibutes of the item to be created
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  }

  await dynamoDb.put(params)

  return params.Item
})
