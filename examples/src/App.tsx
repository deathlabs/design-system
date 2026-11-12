import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CodeIcon from "@mui/icons-material/Code";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { AppLayout } from "@deathlabs/design-system";
import { useState } from "react";

const navigation = [
  { label: "Mission Records", icon: <DashboardOutlinedIcon /> },
  { label: "Assignments", icon: <AssignmentTurnedInOutlinedIcon /> },
  { label: "Assets", icon: <Inventory2OutlinedIcon /> },
  { label: "Activity Log", icon: <HistoryOutlinedIcon /> },
  { label: "Archive", icon: <ArchiveOutlinedIcon /> },
];

type RecordStatus = "Active" | "Draft" | "Review";

interface MissionRecord {
  id: number;
  name: string;
  owner: string;
  description: string;
  status: RecordStatus;
  updated: string;
}

const initialRecords: MissionRecord[] = [
  {
    id: 1,
    name: "NERV Unit-01 Readiness",
    owner: "Misato Katsuragi",
    description:
      "Coordinate launch checks and synchronization telemetry for the next sortie.",
    status: "Active",
    updated: "Today",
  },
  {
    id: 2,
    name: "Tomb World Awakening",
    owner: "Sautekh Recon Cohort",
    description:
      "Track dormant Necron structures showing renewed power signatures.",
    status: "Review",
    updated: "Yesterday",
  },
  {
    id: 3,
    name: "Hive Fleet Behemoth Watch",
    owner: "Xenobiology Division",
    description:
      "Map Tyranid bio-ship movement along the outer defense perimeter.",
    status: "Active",
    updated: "Nov 10",
  },
  {
    id: 4,
    name: "LV-426 Recovery",
    owner: "Weyland-Yutani Survey Team",
    description:
      "Inventory abandoned colony assets and quarantine anomalous specimens.",
    status: "Draft",
    updated: "Nov 9",
  },
  {
    id: 5,
    name: "Gotham Signal Watch",
    owner: "Barbara Gordon",
    description:
      "Correlate unusual broadcasts with active cases across Gotham City.",
    status: "Review",
    updated: "Nov 8",
  },
];

const statusColors = {
  Active: "success",
  Draft: "default",
  Review: "warning",
} as const;

const nextStatus: Record<RecordStatus, RecordStatus> = {
  Active: "Review",
  Review: "Draft",
  Draft: "Active",
};

function App() {
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNavigation, setSelectedNavigation] =
    useState("Mission Records");
  const [records, setRecords] = useState(initialRecords);
  const [query, setQuery] = useState("");
  const [nextRecordId, setNextRecordId] = useState(initialRecords.length + 1);
  const isUserMenuOpen = Boolean(userMenuAnchor);

  const visibleRecords = records.filter((record) =>
    `${record.name} ${record.owner} ${record.description} ${record.status}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const createRecord = () => {
    setRecords((currentRecords) => [
      ...currentRecords,
      {
        id: nextRecordId,
        name: `Uncatalogued Anomaly ${nextRecordId}`,
        owner: "Operations Desk",
        description:
          "Newly reported event awaiting assignment and initial assessment.",
        status: "Draft",
        updated: "Just now",
      },
    ]);
    setNextRecordId((currentId) => currentId + 1);
  };

  const editRecord = (id: number) => {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              status: nextStatus[record.status],
              updated: "Just now",
            }
          : record,
      ),
    );
  };

  const deleteRecord = (id: number) => {
    setRecords((currentRecords) =>
      currentRecords.filter((record) => record.id !== id),
    );
  };

  const userMenu = (
    <>
      <ButtonBase
        aria-controls={isUserMenuOpen ? "user-menu" : undefined}
        aria-expanded={isUserMenuOpen ? "true" : undefined}
        aria-haspopup="menu"
        aria-label="Open user menu"
        onClick={(event) => setUserMenuAnchor(event.currentTarget)}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          gap: 1,
          px: 1,
          py: 0.5,
          textAlign: "left",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            height: 32,
            width: 32,
          }}
        >
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }} variant="body2">
            Victor Fernandez III
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.2 }}
            variant="caption"
          >
            victor@deathlabs.io
          </Typography>
        </Box>
      </ButtonBase>
      <Menu
        anchorEl={userMenuAnchor}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        id="user-menu"
        onClose={() => setUserMenuAnchor(null)}
        open={isUserMenuOpen}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "background.paper",
              color: "text.primary",
              mt: 1,
              minWidth: 320,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 700 }}>Victor Fernandez III</Typography>
          <Typography color="text.secondary" variant="body2">
            victor@deathlabs.io
          </Typography>
        </Box>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <MenuBookOutlinedIcon />
          </ListItemIcon>
          User guide
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <CodeIcon />
          </ListItemIcon>
          Development guide
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <FeedbackOutlinedIcon />
          </ListItemIcon>
          Share feedback
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <HeadsetMicOutlinedIcon />
          </ListItemIcon>
          Contact us
        </MenuItem>
      </Menu>
    </>
  );

  const sidebar = (
    <List aria-label="Primary navigation" sx={{ py: 2 }}>
      {navigation.map((item) => (
        <ListItemButton
          aria-current={selectedNavigation === item.label ? "page" : undefined}
          aria-label={item.label}
          key={item.label}
          onClick={() => setSelectedNavigation(item.label)}
          selected={selectedNavigation === item.label}
          sx={(theme) => ({
            borderLeft: 4,
            borderColor: "transparent",
            borderRadius: 0,
            color: "text.secondary",
            justifyContent: {
              xs: "flex-start",
              md: sidebarOpen ? "flex-start" : "center",
            },
            minHeight: 56,
            px: { xs: 2, md: sidebarOpen ? 2 : 0 },
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: "text.primary",
            },
            "&.Mui-selected": {
              bgcolor: alpha(theme.palette.primary.main, 0.22),
              borderColor: "primary.main",
              color: "text.primary",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.28),
              },
            },
          })}
        >
          <Tooltip placement="right" title={sidebarOpen ? "" : item.label}>
            <ListItemIcon
              sx={{
                color: "inherit",
                justifyContent: "center",
                minWidth: { xs: 48, md: sidebarOpen ? 48 : 0 },
              }}
            >
              {item.icon}
            </ListItemIcon>
          </Tooltip>
          <ListItemText
            primary={item.label}
            sx={{
              display: { xs: "block", md: sidebarOpen ? "block" : "none" },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <AppLayout
      classification="UNCLASSIFIED"
      maxWidth="xl"
      onSidebarOpenChange={setSidebarOpen}
      sidebar={sidebar}
      sidebarOpen={sidebarOpen}
      title="Demo"
      userMenu={userMenu}
    >
      <Stack spacing={3} sx={{ py: { xs: 3, md: 5 } }}>
        <Stack
          alignItems={{ xs: "stretch", sm: "center" }}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography component="h1" variant="h4">
              Mission Records
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Create, review, and maintain active mission records.
            </Typography>
          </Box>
          <Button
            onClick={createRecord}
            startIcon={<AddIcon />}
            variant="contained"
          >
            Create Record
          </Button>
        </Stack>

        <TextField
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, owner, or status"
          slotProps={{
            htmlInput: { "aria-label": "Search records" },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          value={query}
        />

        <Box
          data-testid="record-collection"
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {visibleRecords.map((record) => (
            <Card key={record.id}>
              <CardContent>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography component="h2" variant="h6">
                    {record.name}
                  </Typography>
                  <Chip
                    color={statusColors[record.status]}
                    label={record.status}
                    size="small"
                  />
                </Stack>
                <Typography
                  color="text.secondary"
                  sx={{ mt: 2 }}
                  variant="body2"
                >
                  Owner
                </Typography>
                <Typography>{record.owner}</Typography>
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  {record.description}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mt: 2 }}
                  variant="caption"
                >
                  Updated {record.updated}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <IconButton
                  aria-label={`Edit ${record.name}`}
                  onClick={() => editRecord(record.id)}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label={`Delete ${record.name}`}
                  color="error"
                  onClick={() => deleteRecord(record.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>

        {visibleRecords.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography component="h2" variant="h6">
              No records found
            </Typography>
            <Typography color="text.secondary">
              Try a different search term.
            </Typography>
          </Box>
        )}
      </Stack>
    </AppLayout>
  );
}

export default App;
