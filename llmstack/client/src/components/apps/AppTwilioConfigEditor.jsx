import { Alert, Box, Stack, TextField } from "@mui/material";
import { useRecoilValue } from "recoil";
import { profileFlagsState } from "../../data/atoms";
import { EmbedCodeSnippet } from "./EmbedCodeSnippets";
import { AppSaveButtons } from "./AppSaveButtons";

export function AppTwilioConfigEditor(props) {
  const { app, saveApp, twilioConfig, setTwilioConfig } = props;
  const profileFlags = useRecoilValue(profileFlagsState);

  return profileFlags.CAN_ADD_TWILIO_INTERGRATION ? (
    <Box>
      <Stack direction="column" gap={2}>
        <TextField
          id="account_sid"
          label="Account SID"
          helperText="Twilio Account SID can be found on the Twilio Console dashboard under Account Info."
          onChange={(e) =>
            setTwilioConfig({ ...twilioConfig, account_sid: e.target.value })
          }
          defaultValue={twilioConfig?.account_sid || ""}
          size="small"
        />
        <TextField
          id="auth_token"
          label="Auth Token"
          helperText="Twilio Auth token Auth Token can be found on the Twilio Console dashboard under Account Info."
          onChange={(e) =>
            setTwilioConfig({ ...twilioConfig, auth_token: e.target.value })
          }
          defaultValue={twilioConfig?.auth_token || ""}
          size="small"
        />
        <TextField
          id="twilio_numbers"
          label="Twilio Phone Numbers"
          helperText="Add comma separated list of Twilio phone numbers"
          onChange={(e) =>
            setTwilioConfig({
              ...twilioConfig,
              phone_numbers: e.target.value.split(",").map((n) => n.trim()),
            })
          }
          defaultValue={twilioConfig?.phone_numbers?.join(",")}
          size="small"
        />
        <EmbedCodeSnippet app={app} integration="twilio" />
      </Stack>
      <Stack
        direction="row"
        gap={1}
        sx={{
          flexDirection: "row-reverse",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <AppSaveButtons saveApp={saveApp} />
      </Stack>
    </Box>
  ) : (
    <Alert severity="warning" sx={{ margin: "10px" }}>
      <span>
        This account is not eligible to use Twilio integration. Please upgrade
        your account to trigger this app from Twilio.
        <br />
        To upgrade your plan, click on <b>Manage Subscription</b> in the{" "}
        <a href="/settings">Settings</a> page.
      </span>
    </Alert>
  );
}
