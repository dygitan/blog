import { Button, TextArea, TextField } from '~/components';
import useHook from './hook';

export default function NewPost() {
  const { events, state } = useHook();
  return (
    <div className="container px-0">
      <div className="row">
        <div className="col-6">
          <div>
            <TextField
              label="Title"
              name="title"
              onChange={events.onInputChange}
              placeholder="What's the title of your post?"
              value={state.title || ''}
            />
          </div>
          <div className="mt-3">
            <TextArea
              label="Description"
              name="description"
              onChange={events.onInputChange}
              placeholder="Give your post some description"
              rows={10}
              value={state.description || ''}
            />
          </div>
          <hr />
          <div className="text-right">
            <Button label="Post" onClick={events.onClickPost} />
          </div>
        </div>
      </div>
    </div>
  );
}
