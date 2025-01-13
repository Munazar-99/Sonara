import React from 'react';

interface ResetPasswordEmailProps {
  resetLink: string;
  userName?: string;
}

const ResetPasswordEmail = ({
  resetLink,
  userName,
}: ResetPasswordEmailProps) => {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Reset your password</title>
      </head>
      <body
        style={{
          backgroundColor: '#f6f9fc',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: '14px',
          lineHeight: '1.5',
          margin: 0,
          padding: 0,
          WebkitTextSizeAdjust: '100%',
          textSizeAdjust: '100%',
        }}
      >
        <table
          cellPadding="0"
          cellSpacing="0"
          border={0}
          width="100%"
          style={{ minWidth: '100%', backgroundColor: '#f6f9fc' }}
        >
          <tr>
            <td align="center" valign="top">
              <table
                cellPadding="0"
                cellSpacing="0"
                border={0}
                width="100%"
                style={{
                  maxWidth: '600px',
                  margin: '0 auto',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: '40px 30px',
                      backgroundColor: '#4F46E5',
                      textAlign: 'center',
                    }}
                  >
                    <h1
                      style={{
                        color: '#ffffff',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        margin: '0',
                      }}
                    >
                      Password Reset Request
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '30px' }}>
                    <p style={{ marginBottom: '20px', color: '#333333' }}>
                      Hello {userName ? userName : 'there'},
                    </p>
                    <p style={{ marginBottom: '20px', color: '#333333' }}>
                      We received a request to reset your password. If you
                      didn&apos;t make this request, you can safely ignore this
                      email.
                    </p>
                    <p style={{ marginBottom: '20px', color: '#333333' }}>
                      To reset your password, click the button below:
                    </p>
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                      width="100%"
                    >
                      <tr>
                        <td align="center">
                          <a
                            href={resetLink}
                            style={{
                              backgroundColor: '#4F46E5',
                              border: '1px solid #4F46E5',
                              borderRadius: '4px',
                              color: '#ffffff',
                              display: 'inline-block',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              padding: '12px 24px',
                              textDecoration: 'none',
                              textTransform: 'uppercase',
                            }}
                          >
                            Reset Password
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style={{ marginTop: '20px', color: '#333333' }}>
                      This link will expire in 24 hours for security reasons.
                    </p>
                    <p style={{ marginTop: '20px', color: '#333333' }}>
                      If you continue to have problems, please contact our
                      support team.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      backgroundColor: '#f6f9fc',
                      padding: '20px',
                      textAlign: 'center',
                      color: '#666666',
                      fontSize: '12px',
                    }}
                  >
                    <p style={{ margin: '0' }}>
                      This is an automated message, please do not reply to this
                      email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default ResetPasswordEmail;
