import * as React from 'react';

interface RaycastMagicLinkEmailProps {
  magicLink?: string;
}

const RaycastMagicLinkEmail = ({ magicLink }: RaycastMagicLinkEmailProps) => (
  <div className="bg-white font-sans">
    <div
      className="mx-auto max-w-4xl bg-cover bg-bottom px-6 py-6"
      style={{ backgroundImage: 'url("/static/raycast-bg.png")' }}
    >
      <img
        src="/static/raycast-logo.png"
        width={48}
        height={48}
        alt="Raycast"
        className="mb-6"
      />
      <h1 className="mt-12 text-3xl font-bold">🪄 Your magic link</h1>
      <div className="my-6">
        <p className="mb-3 text-lg leading-7">
          <a href={magicLink} className="text-red-500">
            👉 Click here to sign in 👈
          </a>
        </p>
        <p className="mb-3 text-lg leading-7">
          If you didnt request this, please ignore this email.
        </p>
      </div>
      <p className="text-lg">
        Best,
        <br />- Raycast Team
      </p>
      <hr className="my-12 border-gray-300" />
      <img
        src="/static/raycast-logo.png"
        width={32}
        height={32}
        className="mb-5 grayscale filter"
        alt="Raycast"
      />
      <p className="ml-1 text-sm text-gray-500">Raycast Technologies Inc.</p>
      <p className="ml-1 text-sm text-gray-500">
        2093 Philadelphia Pike #3222, Claymont, DE 19703
      </p>
    </div>
  </div>
);

RaycastMagicLinkEmail.PreviewProps = {
  magicLink: 'https://raycast.com',
} as RaycastMagicLinkEmailProps;

export default RaycastMagicLinkEmail;
