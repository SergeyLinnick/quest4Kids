import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import { useEffect, useState } from "react";

const apiKey = "YOUR_STREAM_API_KEY";
const userId = "USER_ID";
const userToken = "USER_TOKEN_FROM_SERVER";

export default function Messenger() {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    async function init() {
      const client = StreamChat.getInstance(apiKey);
      await client.connectUser(
        {
          id: userId,
          name: "John Doe",
          image: "https://getstream.io/random_png/?id=john&name=John",
        },
        userToken,
      );
      setChatClient(client);
    }

    init();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, []);

  if (!chatClient) return <div>Loading chat...</div>;

  const filters = { type: "messaging", members: { $in: [userId] } };
  const sort = { last_message_at: -1 };

  return (
    <Chat client={chatClient} theme="messaging light">
      <div className="flex h-screen">
        <div className="w-1/4 border-r">
          <ChannelList filters={filters} sort={sort} />
        </div>
        <div className="flex-1">
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
}
