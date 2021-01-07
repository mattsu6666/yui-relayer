package cmd

import (
	"bufio"
	"os"
	"strings"

	fabriccmd "github.com/datachainlab/relayer/chains/fabric/cmd"
	tendermintcmd "github.com/datachainlab/relayer/chains/tendermint/cmd"
	"github.com/datachainlab/relayer/config"
	"github.com/datachainlab/relayer/encoding"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	homePath string
	debug    bool
	// configInstance *config.Config
	defaultHome = os.ExpandEnv("$HOME/.urelayer")
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "uly",
	Short: "This application relays data between configured IBC enabled chains",
}

func init() {
	cobra.EnableCommandSorting = false
	rootCmd.SilenceUsage = true

	// Register top level flags --home and --debug
	rootCmd.PersistentFlags().StringVar(&homePath, flags.FlagHome, defaultHome, "set home directory")
	rootCmd.PersistentFlags().BoolVarP(&debug, "debug", "d", false, "debug output")
	if err := viper.BindPFlag(flags.FlagHome, rootCmd.Flags().Lookup(flags.FlagHome)); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("debug", rootCmd.Flags().Lookup("debug")); err != nil {
		panic(err)
	}

	ec := encoding.MakeEncodingConfig()
	ctx := &config.Context{Config: &config.Config{}, Marshaler: ec.Marshaler}

	// Register subcommands
	rootCmd.AddCommand(
		configCmd(ctx),
		chainsCmd(ctx),
		transactionCmd(ctx),
		pathsCmd(ctx),
		flags.LineBreak,
		tendermintcmd.TendermintCmd(ec.Marshaler, ctx),
		fabriccmd.FabricCmd(ctx),
	)

	rootCmd.PersistentPreRunE = func(_ *cobra.Command, _ []string) error {
		// reads `homeDir/config/config.yaml` into `var config *Config` before each command
		return initConfig(ctx, rootCmd)
	}
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

// readLineFromBuf reads one line from stdin.
func readStdin() (string, error) {
	str, err := bufio.NewReader(os.Stdin).ReadString('\n')
	return strings.TrimSpace(str), err
}
