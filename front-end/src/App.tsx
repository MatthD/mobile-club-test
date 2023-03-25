import React, { FormEvent, useState } from 'react';
import logo from './logo.svg';
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from './graphql/message.generated';

function App() {
  const [newMessage, setNewMessage] = useState({ value: '' });
  const { data, refetch } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage({ value: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.value) {
      await addMessage({ variables: { message: newMessage.value } });
      setNewMessage({ value: '' });
      await refetch();
    }
  };

  // TODO can be shared with backend

  return (
    <div className="bg-main-blue min-h-screen">
      <header className="container mx-auto py-14 flex justify-between">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-white font-bold text-2xl">URL shortener</h1>
      </header>
      <section className="container mx-auto py-8">
        <div
          data-cy="messageContainer"
          className="p-8 flex flex-col gap-6 items-center bg-white rounded-2xl"
        >
          <div className="font-semibold text-xl">
            Add a few messages to ensure that everything is working correctly :
          </div>
          {data?.messages.map((message) => {
            // yeah let me my hoisted helper function 😂
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const messageWithUrlLink = replaceUrls(message.message);
            return (
              <div
                key={message.id}
                dangerouslySetInnerHTML={{ __html: messageWithUrlLink }}
              />
            );
          })}
          <div className="font-semibold">
            <form className="flex gap-4" onSubmit={onSubmit}>
              <input
                data-cy="messageInput"
                placeholder="Your message"
                className="p-3 w-96 border-2 rounded-full border-main-blue"
                value={newMessage.value}
                onChange={onChange}
              />
              <button
                data-cy="submit"
                type="submit"
                className="p-3 bg-main-blue text-white rounded-full"
              >
                Add message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// TODO this has to be shared regex with backend and a more JSX way like react-html-parser
function replaceUrls(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" class="underline"=>$1</a>');
}

export default App;
